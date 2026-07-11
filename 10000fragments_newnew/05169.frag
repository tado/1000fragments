uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.51);
    float gsh = hash21(vec2(grow, floor(t * 4.62))) - 0.5;
    float gx = p.x + gsh * 0.62;
    v = sin(gx * 8.43 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.72));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.38), cos(time * 0.47)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.60 / 3.1415927, 1.17 / r - time * 1.20);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.45, 0.31, 0.96) * (0.25 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.82, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
