uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.12 + sr * 18.80 - t * 3.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.71) * p * 16.56;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 1.09 + time * 0.30, vec3(0.46, 0.54, 0.46), vec3(0.32, 0.48, 0.47), vec3(1.21, 1.36, 0.76), vec3(0.39, 0.87, 0.86)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
