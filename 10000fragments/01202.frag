uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.45 + t * 2.27 + ph) + sin(p.y * 3.47 - t * 2.27 + ph)
        + sin((p.x + p.y) * 5.36 + t * 2.27 + ph) + sin(length(p) * 6.30 - t * 2.27 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.09) - 0.5;
	p = abs(p) - 0.55;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.44 + time * 0.12);
	col = mod(col * 2.07, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
