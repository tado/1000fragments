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
    v = sin(sa * 8.60 + sr * 5.48 - t * 2.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.75) * p;
	p = abs(p);
	p = fract(p * 2.64) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.15, vec3(0.48, 0.54, 0.42), vec3(0.41, 0.31, 0.36), vec3(0.71, 1.31, 1.19), vec3(0.47, 0.68, 0.85));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
