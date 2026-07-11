uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 14.60 - t * 6.08 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 24.98 - t * 1.93 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.76;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.44 / 3.1415927, 0.49 / r + time * 1.13);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.99, 0.97, 0.86) * (0.09 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.82, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
