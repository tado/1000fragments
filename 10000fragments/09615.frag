uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.25 * cos(sa * 4.0 + t * 1.28 + ph);
    v = sin((sr - petal) * 8.17);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.97; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 1.63 * p.y + time * 1.51); p.y += 0.32 / wf * cos(wf * 2.25 * p.x + time * 1.93); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.42, 0.58), vec3(0.79, 0.57, 0.68), d);
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
