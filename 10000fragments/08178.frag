uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.19 + t * 3.20 + ph) + sin(p.y * 12.87 - t * 3.20 + ph)
        + sin((p.x + p.y) * 8.52 + t * 3.20 + ph) + sin(length(p) * 6.76 - t * 3.20 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.67 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
