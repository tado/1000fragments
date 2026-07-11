uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.47);
    float gsh = hash21(vec2(grow, floor(t * 5.95))) - 0.5;
    float gx = p.x + gsh * 1.04;
    v = sin(gx * 15.45 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.40));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.73) * 0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.45 / 3.1415927, 1.34 / r + (time * 0.73) * 2.50);
	float d = field(tv, (time * 0.73), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.03, 0.00), vec3(0.80, 0.66, 0.65), cc);
	col *= clamp(r * 2.90, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.037, 0.995, 0.937) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
