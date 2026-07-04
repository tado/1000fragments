uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.31);
    float gsh = hash21(vec2(grow, floor(t * 4.82))) - 0.5;
    float gx = p.x + gsh * 0.99;
    v = sin(gx * 8.08 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.38));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.41 / 3.1415927, 1.26 / r - time * 2.32);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.74 + time * 0.36);
	col *= clamp(r * 1.53, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
