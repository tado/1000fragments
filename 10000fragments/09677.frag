uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.49; vec2 jc = vec2(-0.15 + 0.3 * sin(t * 1.15 + ph), 0.61 + 0.3 * cos(t * 1.15 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.26; p = rot2(0.32) * p; }
	p = rot2(p.y * 3.38 + time * 0.96) * p;
	p = rot2(time * 1.07) * p;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.21, vec3(0.41, 0.55, 0.54), vec3(0.40, 0.38, 0.41), vec3(0.87, 1.31, 0.71), vec3(0.31, 0.33, 0.51));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
