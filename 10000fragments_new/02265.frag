uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.30 + t * 1.09 + ph) + sin(p.y * 13.55 - t * 1.09 + ph)
        + sin((p.x + p.y) * 7.57 + t * 1.09 + ph) + sin(length(p) * 12.05 - t * 1.09 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.96) - 0.5;
	p = abs(p) - 0.41;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.67 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
