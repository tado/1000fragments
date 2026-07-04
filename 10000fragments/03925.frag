uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.11);
    float gsh = hash21(vec2(grow, floor(t * 7.04))) - 0.5;
    float gx = p.x + gsh * 0.90;
    v = sin(gx * 12.53 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.31));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.25), cos(time * 0.96)) * 0.29;
	float an = atan(p.y, p.x) + time * -0.31;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.30 / 3.1415927, 1.45 / r + time * 0.50);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.74 + time * 0.29);
	col *= clamp(r * 2.37, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
