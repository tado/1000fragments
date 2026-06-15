uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.50 + t * 4.01 + ph) + sin(p.y * 6.13 - t * 4.01 + ph)
        + sin((p.x + p.y) * 9.71 + t * 4.01 + ph) + sin(length(p) * 17.29 - t * 4.01 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	{ float fr = length(p); p *= 1.0 + 0.28 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.53 + time * 0.21);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
