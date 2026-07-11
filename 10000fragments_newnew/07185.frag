uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.55 + 0.23 * pow(abs(cos(ra * 3.0 + t * 1.84)), 2.71);
    v = sin((rr - pet) * 20.20 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	{ float fr = length(p); p *= 1.0 + 0.30 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.36 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
