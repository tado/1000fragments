uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.20, 0.0)) * 39.90 - t * 7.90 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 36.19 - t * 6.97 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.03 / 3.1415927, 0.44 / r - time * 1.65);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.74, 0.87, 0.62) * (0.09 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= clamp(r * 1.24, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
