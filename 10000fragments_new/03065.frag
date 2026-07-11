uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.80;
	vec2 gp = p * 4.27;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 25.50 - time * 5.67 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.20, 0.42), vec3(0.87, 0.92, 0.48), cc);
	col *= 0.63 + 0.34 * hash21(id + 11.0);
	col *= 0.88 + 0.11 * sin(gl_FragCoord.y * 1.71 + time * 4.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
