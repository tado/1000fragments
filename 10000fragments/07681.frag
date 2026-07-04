uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.86; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 24.37 - t * 3.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.79;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.97;
	{ p = vec2(atan(p.y, p.x) * 2.35, length(p) * 2.36 - time * 0.21); }
	p = fract(p * 1.51) - 0.5;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.81; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.94));
	col = 0.5 + 0.5 * col;
	col *= 0.85 + 0.17 * sin(gl_FragCoord.y * 1.30 + time * 11.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
