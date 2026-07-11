uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.18 + sin(p.y * 1.07 + t * 1.90) * 1.46 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.75 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
