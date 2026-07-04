uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.23 * cos(sa * 6.0 + t * 1.40 + ph);
    v = sin((sr - petal) * 9.18);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.78;
	p *= 3.15;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.31, 0.37), vec3(0.73, 0.93, 0.59), d);
	col = mod(col * 1.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
