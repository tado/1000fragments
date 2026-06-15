uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.11 * cos(sa * 4 + t * 2.51 + ph);
    v = sin((sr - petal) * 8.61);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.93, length(p) * 3.36 - time * 0.39); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.27, 0.48), vec3(0.66, 0.95, 0.57), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
