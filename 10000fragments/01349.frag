uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.22 + t * 1.38 + ph) + sin(p.y * 3.69 - t * 1.38 + ph)
        + sin((p.x + p.y) * 4.22 + t * 1.38 + ph) + sin(length(p) * 6.78 - t * 1.38 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.75;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.39 + time * 0.26);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
