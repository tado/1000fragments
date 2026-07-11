uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.83 + t * 3.93 + ph) + sin(p.y * 8.23 - t * 3.93 + ph)
        + sin((p.x + p.y) * 6.86 + t * 3.93 + ph) + sin(length(p) * 17.25 - t * 3.93 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.02, -0.96) * sin(length(p) * 2.36 - time * 1.42) * 0.35;
	p = abs(p) - 0.25;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.57));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
