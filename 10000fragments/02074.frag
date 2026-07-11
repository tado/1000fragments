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
    v = sin(sa * 4.44 + sr * 11.27 - t * 1.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 2.43 + time * 0.67) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.20, vec3(0.42, 0.54, 0.44), vec3(0.44, 0.49, 0.32), vec3(1.07, 0.80, 0.75), vec3(0.48, 0.42, 0.08));
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
