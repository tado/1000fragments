uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.93 + sr * 6.95 - t * 2.56 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.61) * 0.12;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.14 / 3.1415927, 0.78 / r + (time * 0.61) * 0.51);
	float d = field(tv, (time * 0.61), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.25, 0.31), vec3(0.57, 0.53, 0.72), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 2.39, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.61)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.938, 0.980, 1.029) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
