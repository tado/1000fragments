uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.88 - t * 2.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.32, 0.84) * sin(length(p) * 5.92 - time * 1.93) * 0.14;
	{ float fr = length(p); p *= 1.0 + -0.37 * fr * fr; }
	p *= 1.28;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.86 + time * 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
