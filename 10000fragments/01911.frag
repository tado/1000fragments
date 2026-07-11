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
    v = sin(sa * 6.48 + sr * 12.97 - t * 1.76 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	p = fract(p * 1.87) - 0.5;
	p = rot2(p.y * -3.33 + time * 0.20) * p;
	p = rot2(length(p) * -1.58 + time * 0.62) * p;
	p = rot2(time * -0.83) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.25, vec3(0.49, 0.57, 0.47), vec3(0.45, 0.44, 0.45), vec3(1.09, 1.17, 1.19), vec3(0.32, 0.90, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
