uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.81 + vec2(t * 0.53, -t * 0.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.47;
	p *= 1.53;
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	p += vec2(-0.43, 0.03) * sin(length(p) * 2.67 - time * 1.02) * 0.24;
	{ p = vec2(atan(p.y, p.x) * 2.74, length(p) * 4.73 - time * 0.56); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.20, 0.34), vec3(0.60, 0.57, 0.47), d);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
