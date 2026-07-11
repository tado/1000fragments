uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.75 + vec2(t * 0.45, -t * 0.38) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.31, 0.20) * (0.22 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
