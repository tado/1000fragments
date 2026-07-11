uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.52 + t * 3.73 + ph) + sin(p.y * 7.96 - t * 3.73 + ph)
        + sin((p.x + p.y) * 7.15 + t * 3.73 + ph) + sin(length(p) * 16.58 - t * 3.73 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	p = abs(p) - 0.76;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.86 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
