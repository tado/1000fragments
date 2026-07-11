uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.35 + t * 1.44) - 0.5) * 2.0;
    v = sin((p.y * 2.42 + zx * 1.46 + t * 2.84) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	p = abs(p);
	p.y += sin(p.x * 4.54 + time * 3.60) * 0.21;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.59;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.04, 0.19), vec3(0.93, 0.63, 0.82), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.29 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
