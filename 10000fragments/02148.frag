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
    v = sin(sa * 9.52 + sr * 13.01 - t * 1.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	p = rot2(time * -0.84) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.11, vec3(0.57, 0.53, 0.45), vec3(0.45, 0.36, 0.34), vec3(1.35, 1.09, 1.23), vec3(0.73, 0.38, 0.84));
	col = fract(col * 1.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
