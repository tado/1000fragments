uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.11) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 2.50 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.40; vec2 jc = vec2(-0.23 + 0.3 * sin(t * 1.26 + ph), 0.60 + 0.3 * cos(t * 0.82 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	p = rot2(1.41) * p;
	p = rot2(time * 1.00) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.63 + time * 0.14, vec3(0.44, 0.54, 0.42), vec3(0.40, 0.37, 0.39), vec3(0.71, 1.28, 1.33), vec3(0.68, 0.80, 0.77));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
