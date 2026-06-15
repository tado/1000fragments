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
    float petal = 0.58 + 0.13 * cos(sa * 8 + t * 2.07 + ph);
    v = sin((sr - petal) * 19.52);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	p = rot2(time * 0.44) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.82 + time * 0.26, vec3(0.51, 0.59, 0.57), vec3(0.32, 0.49, 0.36), vec3(0.75, 1.33, 1.11), vec3(0.33, 0.59, 0.88));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
