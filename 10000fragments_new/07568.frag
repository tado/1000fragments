uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.48 + t * 4.62 + ph) + sin(p.y * 10.86 - t * 4.62 + ph)
        + sin((p.x + p.y) * 7.33 + t * 4.62 + ph) + sin(length(p) * 6.49 - t * 4.62 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 3.15;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.15, 1.28, 0.76) + vec3(0.22, 0.18, 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
