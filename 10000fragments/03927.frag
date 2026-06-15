uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.48 + t * 1.31 + ph) + sin(p.y * 11.90 - t * 1.31 + ph)
        + sin((p.x + p.y) * 11.81 + t * 1.31 + ph) + sin(length(p) * 3.69 - t * 1.31 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.87 + time * 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
