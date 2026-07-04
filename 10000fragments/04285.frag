uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.15 + t * 3.78 + ph) * 0.7;
    float wb = sin(p.y * 5.44 - t * 1.64 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.50;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.50 / 3.1415927, 0.86 / r + time * 1.40);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.72 + time * 0.63);
	col *= clamp(r * 1.62, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
