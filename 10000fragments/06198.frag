uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.35 + t * 4.13 + ph) + sin(p.y * 10.80 - t * 3.15 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.78 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.28 + time * 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
