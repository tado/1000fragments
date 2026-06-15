uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.76 + t * 3.16 + ph) + sin(p.y * 5.80 - t * 3.16 + ph)
        + sin((p.x + p.y) * 2.79 + t * 3.16 + ph) + sin(length(p) * 9.93 - t * 3.16 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.50 + time * 0.02);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
