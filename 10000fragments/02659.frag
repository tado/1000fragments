uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.27 * cos(sa * 4 + t * 1.26 + ph);
    v = sin((sr - petal) * 13.14);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	{ float fr = length(p); p *= 1.0 + 0.74 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.18, 0.44), vec3(0.83, 0.87, 0.48), d);
	col = mod(col * 1.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
