uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.47; vec2 jc = vec2(0.09 + 0.3 * sin(t * 1.78 + ph), -0.61 + 0.3 * cos(t * 1.17 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 21.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.57 - t * 0.30;
    v = sin(floor(lv * 5.5) / 5.5 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.25; p = rot2(1.93) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.80);
	float d = d1 + d2;
	vec3 col = palette(d * 1.14 + time * 0.09, vec3(0.46, 0.56, 0.53), vec3(0.40, 0.37, 0.31), vec3(1.28, 1.03, 0.75), vec3(0.31, 0.97, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
