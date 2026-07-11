uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.59 + t * 1.81 + ph) + sin(p.y * 9.06 - t * 1.81 + ph)
        + sin((p.x + p.y) * 2.60 + t * 1.81 + ph) + sin(length(p) * 17.26 - t * 1.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.38 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
