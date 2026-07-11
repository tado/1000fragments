uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.44 + t * 3.38 + ph) + sin(p.y * 8.12 - t * 3.38 + ph)
        + sin((p.x + p.y) * 11.75 + t * 3.38 + ph) + sin(length(p) * 3.94 - t * 3.38 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	p *= 2.87;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.57 + time * 0.28);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
