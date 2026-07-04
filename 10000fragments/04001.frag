uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.80);
    float gsh = hash21(vec2(grow, floor(t * 8.82))) - 0.5;
    float gx = p.x + gsh * 0.39;
    v = sin(gx * 15.85 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.29));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.07 / 3.1415927, 1.44 / r + time * 2.87);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.57, 0.51, 0.66) * (0.10 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.74, 0.0, 1.0);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.45 + time * 10.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
