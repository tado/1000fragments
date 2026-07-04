uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.98) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 2.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.21, 0.05), vec3(0.97, 0.53, 0.59), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.12 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
