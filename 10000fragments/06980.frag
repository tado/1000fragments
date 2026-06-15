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
    v = sin(sa * 2.54 + sr * 13.31 - t * 2.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	p = rot2(2.28) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.02, vec3(0.45, 0.54, 0.48), vec3(0.40, 0.31, 0.38), vec3(0.90, 1.06, 1.31), vec3(0.92, 0.07, 0.06));
	col = mod(col * 1.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
