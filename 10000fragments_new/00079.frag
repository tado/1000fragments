uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.34 + sr * 11.86 - t * 2.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.34;
	p *= 1.73;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.09, vec3(0.59, 0.51, 0.48), vec3(0.30, 0.45, 0.47), vec3(0.75, 1.13, 0.75), vec3(0.97, 0.06, 0.14));
	col = mod(col * 2.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
