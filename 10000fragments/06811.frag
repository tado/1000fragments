uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.57 + t * 0.61 + ph) * 0.7;
    float wb = sin(p.y * 12.20 - t * 3.03 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.65;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.69;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.14));
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.25, 0.76, 0.71) * (0.21 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = fract(col * 1.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
