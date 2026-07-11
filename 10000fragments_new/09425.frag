uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.18);
    float gsh = hash21(vec2(grow, floor(t * 5.66))) - 0.5;
    float gx = p.x + gsh * 0.64;
    v = sin(gx * 17.88 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.02));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.66 / 3.1415927, 1.39 / r - time * 2.28);
	tv.x += tv.y * 0.25;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.30, 0.61, 0.18) * (0.24 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.21, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
