uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.45) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.51 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.69;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.60)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 23.79 - t * 4.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.62;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 1.75 + time * 0.76) * 0.79;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.05);
	float d = d1 * d2;
	vec3 col = vec3(0.91, 0.30, 0.32) * (0.21 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
