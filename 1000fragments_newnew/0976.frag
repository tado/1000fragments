uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.30 + vec2(t * 1.33, -t * 1.23);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.55 / 3.1415927, 1.40 / r + (time * 0.78) * 1.23);
	float d = field(tv, (time * 0.78), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.68, 0.68, 0.68) + vec3(0.12, 0.07, 0.12);
	col *= clamp(r * 2.25, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.78)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.988, 0.991, 1.020) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
