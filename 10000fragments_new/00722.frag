uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.90) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 2.56 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 31.85 - t * 4.90 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 30.31 - t * 5.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.25;
	p = fract(p * 2.52) - 0.5;
	p.x += sin(p.y * 5.67 + time * 2.05) * 0.39;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.40, lr * 2.41 + time * 0.37); }
	p = rot2(time * 0.51) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.14 + time * 0.14, vec3(0.56, 0.57, 0.46), vec3(0.48, 0.42, 0.33), vec3(1.13, 1.39, 1.38), vec3(0.09, 0.22, 0.36));
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
