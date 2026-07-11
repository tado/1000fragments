uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.67 + t * 3.88 + ph) + sin(p.y * 3.14 - t * 3.88 + ph)
        + sin((p.x + p.y) * 5.82 + t * 3.88 + ph) + sin(length(p) * 12.53 - t * 3.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.10 + time * 0.13);
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
