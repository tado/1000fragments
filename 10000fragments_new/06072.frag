uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.43) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 0.69 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.35 + sr * 15.37 - t * 0.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	p = fract(p * 1.85) - 0.5;
	p = abs(p);
	p = rot2(time * -1.50) * p;
	p = (floor(p * 23.4) + 0.5) / 23.4;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.41 + time * 0.01, vec3(0.56, 0.56, 0.52), vec3(0.34, 0.35, 0.34), vec3(1.22, 0.81, 0.71), vec3(0.56, 0.39, 0.86));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
