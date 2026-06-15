uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.32 - t * 7.28 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.08, length(p) * 5.12 - time * 0.34); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.30 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
